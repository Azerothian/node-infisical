import { BaseResource } from "./base";
import type {
  GetSecretAccessListParams,
  GetSecretAccessListResponse,
} from "../types/secrets";

export class SecretsResource extends BaseResource {
  async getAccessList(params: GetSecretAccessListParams): Promise<GetSecretAccessListResponse> {
    const { secretName, ...query } = params;
    return this.http.get<GetSecretAccessListResponse>(
      `/api/v1/secrets/${encodeURIComponent(secretName)}/access-list`,
      { ...query } as Record<string, unknown>
    );
  }
}
