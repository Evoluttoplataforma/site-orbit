// Registro público de intercorrências da *aplicação* Orbit.
// Só entra o que a operação confirmou — nunca preencher com chute ou com
// incidente de outra região do provedor. Fonte de infra: status.supabase.com.

export type OrbitIncident = {
  id: string;
  title: string;
  startedAt: string;
  resolvedAt: string | null;
  severity: 'minor' | 'major' | 'critical';
  summary: string;
};

export const ORBIT_INCIDENTS: OrbitIncident[] = [];
