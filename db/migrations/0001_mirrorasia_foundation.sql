-- MirrorAsia prospective MVP schema. NOT applied automatically.
-- No personal respondent records are stored by this schema.
BEGIN;
CREATE TABLE IF NOT EXISTS mirrorasia_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  study_code text NOT NULL UNIQUE,
  region_code text NOT NULL DEFAULT 'BD-DHAKA',
  category text NOT NULL DEFAULT 'fmcg-beverage',
  data_classification text NOT NULL DEFAULT 'illustrative'
    CHECK (data_classification IN ('illustrative','consented_aggregate')),
  population_version text NOT NULL,
  consent_protocol_version text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mirrorasia_scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id uuid NOT NULL REFERENCES mirrorasia_studies(id) ON DELETE RESTRICT,
  payload jsonb NOT NULL CHECK (jsonb_typeof(payload)='object'),
  seed integer NOT NULL,
  engine_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mirrorasia_scenarios_study_created_idx
  ON mirrorasia_scenarios(study_id,created_at DESC);
CREATE TABLE IF NOT EXISTS mirrorasia_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id uuid NOT NULL REFERENCES mirrorasia_scenarios(id) ON DELETE RESTRICT,
  result jsonb NOT NULL CHECK (jsonb_typeof(result)='object'),
  is_human_validated boolean NOT NULL DEFAULT false
    CHECK (is_human_validated = false),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mirrorasia_backup_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  backup_object_key text NOT NULL UNIQUE,
  archive_sha256 text NOT NULL CHECK (length(archive_sha256)=64),
  encryption_scheme text NOT NULL DEFAULT 'age-x25519',
  dump_verified boolean NOT NULL DEFAULT false,
  restore_verified boolean NOT NULL DEFAULT false,
  checked_at timestamptz NOT NULL DEFAULT now()
);
COMMIT;
