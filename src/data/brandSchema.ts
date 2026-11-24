import { z } from 'zod';

export const SourceStatusSchema = z.enum([
  'measured',
  'vendor',
  'historical',
  'partial',
  'not_tested',
  'unavailable',
  'pending',
]);

export const PlanSchema = z.object({
  name: z.string(),
  billingCycle: z.enum(['月付', '季付', '半年付', '年付', '两年付', '三年付', '一次性付费', '待核实']),
  priceCny: z.number().nullable(),
  trafficAmount: z.number().nullable(),
  trafficUnit: z.enum(['GB', 'TB', '待核实']),
  trafficResetCycle: z.enum(['每月', '一次性', '待核实']),
  effectiveMonthlyCny: z.number().nullable(),
  isOneTime: z.boolean().default(false),
  specialNotes: z.string().optional(),
  sourceStatus: SourceStatusSchema.default('historical'),
});

export const SpeedTestRowSchema = z.object({
  region: z.string(),
  latencyMs: z.number().nullable(),
  downloadMbps: z.number().nullable(),
  downloadMBs: z.number().nullable().optional(),
  note: z.string().optional(),
});

export const SpeedTestSessionSchema = z.object({
  label: z.string(),
  date: z.string(),
  isPeakHour: z.boolean().nullable(),
  environment: z.string(),
  tool: z.string(),
  sampleSize: z.string(),
  sourceStatus: SourceStatusSchema,
  sourceNote: z.string(),
  rows: z.array(SpeedTestRowSchema),
});

export const ServiceStatusSchema = z.object({
  service: z.string(),
  status: z.enum(['measured', 'historical', 'vendor', 'partial', 'not_tested', 'unavailable']),
  note: z.string(),
});

export const ClaimItemSchema = z.object({
  claim: z.string(),
  sourceStatus: SourceStatusSchema,
  note: z.string(),
});

export const ConflictRecordSchema = z.object({
  field: z.string(),
  summary: z.string(),
  sources: z.array(z.string()),
  resolution: z.string(),
});

export const BrandSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
  monogram: z.string(),
  brandAccent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  officialSite: z.string(),
  affiliateSlug: z.string(),
  launchYear: z.string(),
  description: z.string(),
  positioning: z.string(),
  editorPriorityCandidate: z.number().int().min(1).max(11).nullable(),
  priceTier: z.enum(['ultra-budget', 'entry-annual', 'mainstream-monthly', 'premium-line', 'pending']),
  minEffectiveMonthlyCny: z.number().nullable(),
  minMonthlyPlanCny: z.number().nullable(),
  hasNonExpiringPlan: z.boolean(),
  dataCompleteness: z.enum(['high', 'medium', 'basic']),
  plans: z.array(PlanSchema),
  pricingSource: z.object({
    sourceDate: z.string(),
    sourceLabel: z.string(),
    paymentMethods: z.array(z.string()),
    discountPolicy: z.string(),
  }),
  protocols: z.array(z.object({ name: z.string(), status: SourceStatusSchema, note: z.string() })),
  routes: z.array(z.object({ name: z.string(), status: SourceStatusSchema, note: z.string() })),
  nodeRegions: z.array(z.object({ region: z.string(), count: z.string(), status: SourceStatusSchema })),
  clients: z.object({
    mode: z.enum(['dedicated_only', 'dedicated_and_third_party', 'third_party_supported', 'pending']),
    supportedClients: z.array(z.string()),
    note: z.string(),
  }),
  supportsSubscription: z.enum(['yes', 'no_dedicated_only', 'pending']),
  aiServices: z.array(ServiceStatusSchema),
  streamingServices: z.array(ServiceStatusSchema),
  speedTests: z.array(SpeedTestSessionSchema),
  benefits: z.array(z.string()),
  limitations: z.array(z.string()),
  risks: z.array(z.string()),
  suitableFor: z.array(z.string()),
  unsuitableFor: z.array(z.string()),
  claims: z.array(ClaimItemSchema),
  conflicts: z.array(ConflictRecordSchema),
  pendingVerifications: z.array(z.string()),
  sourceLinks: z.array(z.object({ label: z.string(), date: z.string(), status: SourceStatusSchema })),
  sourceStatus: SourceStatusSchema,
  verifiedAt: z.string().nullable(),
  lastUpdated: z.string(),
  reviewStatus: z.enum(['flagship_reviewed', 'documented_with_gaps', 'seed_pending_verification']),
  targetKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
});

export type BrandRecord = z.infer<typeof BrandSchema>;
export type PlanRecord = z.infer<typeof PlanSchema>;
export type SpeedTestSession = z.infer<typeof SpeedTestSessionSchema>;
export type ServiceStatus = z.infer<typeof ServiceStatusSchema>;
