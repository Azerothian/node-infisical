import type { PkiAlertEventType, PkiAlertChannelType } from "./common";

export interface PkiFilterRule {
  field: string;
  operator: string;
  value: string;
}

export interface PkiAlertChannel {
  id: string;
  channelType: PkiAlertChannelType;
  config: Record<string, unknown>;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PkiAlert {
  id: string;
  name: string;
  description: string | null;
  eventType: PkiAlertEventType;
  alertBefore: string;
  filters: PkiFilterRule[];
  enabled: boolean;
  projectId: string;
  channels: PkiAlertChannel[];
  createdAt: string;
  updatedAt: string;
}

export interface PkiAlertCertificate {
  id: string;
  serialNumber: string;
  commonName: string;
  san: string[];
  profileName: string | null;
  enrollmentType: string | null;
  notBefore: string;
  notAfter: string;
  status: string;
}

export interface CreatePkiAlertParams {
  projectId: string;
  name: string;
  description?: string | null;
  eventType: PkiAlertEventType;
  alertBefore: string;
  filters?: PkiFilterRule[];
  enabled?: boolean;
  channels?: Array<{
    channelType: PkiAlertChannelType;
    config: Record<string, unknown>;
    enabled?: boolean;
  }>;
}

export interface CreatePkiAlertResponse {
  alert: PkiAlert;
}

export interface ListPkiAlertsParams {
  projectId: string;
  search?: string;
  eventType?: PkiAlertEventType;
  enabled?: boolean;
  limit?: number;
  offset?: number;
}

export interface ListPkiAlertsResponse {
  alerts: PkiAlert[];
  total: number;
}

export interface GetPkiAlertParams {
  alertId: string;
}

export interface GetPkiAlertResponse {
  alert: PkiAlert;
}

export interface UpdatePkiAlertParams {
  alertId: string;
  name?: string;
  description?: string | null;
  eventType?: PkiAlertEventType;
  alertBefore?: string;
  filters?: PkiFilterRule[];
  enabled?: boolean;
  channels?: Array<{
    id?: string;
    channelType: PkiAlertChannelType;
    config: Record<string, unknown>;
    enabled?: boolean;
  }>;
}

export interface UpdatePkiAlertResponse {
  alert: PkiAlert;
}

export interface DeletePkiAlertParams {
  alertId: string;
}

export interface DeletePkiAlertResponse {
  alert: PkiAlert;
}

export interface ListPkiAlertCertificatesParams {
  alertId: string;
  limit?: number;
  offset?: number;
}

export interface ListPkiAlertCertificatesResponse {
  certificates: PkiAlertCertificate[];
  total: number;
}

export interface PreviewPkiAlertCertificatesParams {
  projectId: string;
  filters: PkiFilterRule[];
  alertBefore: string;
  limit?: number;
  offset?: number;
}

export interface PreviewPkiAlertCertificatesResponse {
  certificates: PkiAlertCertificate[];
  total: number;
}
