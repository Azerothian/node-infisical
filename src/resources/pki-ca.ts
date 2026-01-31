import { BaseResource } from "./base";
import type {
  ListCertificateAuthoritiesParams,
  ListCertificateAuthoritiesResponse,
} from "../types/pki-ca";

export class PkiCaResource extends BaseResource {
  async list(
    params: ListCertificateAuthoritiesParams
  ): Promise<ListCertificateAuthoritiesResponse> {
    return this.http.get<ListCertificateAuthoritiesResponse>(
      "/pki/ca",
      { ...params } as Record<string, unknown>
    );
  }
}
