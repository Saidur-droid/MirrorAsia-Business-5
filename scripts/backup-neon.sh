#!/usr/bin/env bash
# Offline-capable disaster recovery script. Needs direct Neon DATABASE_URL,
# AGE_RECIPIENT (public key), AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
# CLOUDFLARE_R2_ENDPOINT, and R2_BACKUP_BUCKET (private).
set -euo pipefail
umask 077
: "${DATABASE_URL:?direct Neon DATABASE_URL required}"
: "${AGE_RECIPIENT:?age recipient public key required}"
: "${CLOUDFLARE_R2_ENDPOINT:?R2 S3 endpoint required}"
: "${R2_BACKUP_BUCKET:?private R2 bucket required}"
command -v pg_dump >/dev/null
command -v pg_restore >/dev/null
command -v age >/dev/null
command -v aws >/dev/null
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
stamp="$(date -u '+%Y%m%dT%H%M%SZ')"
pg_dump --dbname="$DATABASE_URL" --format=custom --no-owner --no-acl --file="$work/dump.pgcustom"
pg_restore --list "$work/dump.pgcustom" >/dev/null
sha256sum "$work/dump.pgcustom" | awk '{print $1}' > "$work/dump.sha256"
age -r "$AGE_RECIPIENT" -o "$work/dump.age" "$work/dump.pgcustom"
object="mirrorasia/neon/${stamp}.pgcustom.age"
aws --endpoint-url "$CLOUDFLARE_R2_ENDPOINT" s3 cp "$work/dump.age" "s3://$R2_BACKUP_BUCKET/$object" --no-progress
aws --endpoint-url "$CLOUDFLARE_R2_ENDPOINT" s3api head-object --bucket "$R2_BACKUP_BUCKET" --key "$object" >/dev/null
echo "Encrypted backup uploaded and remote existence confirmed: $object"
echo "Source dump SHA256: $(cat "$work/dump.sha256")"
echo "IMPORTANT: encrypted backup is NOT restore-verified until an isolated restore test succeeds."
