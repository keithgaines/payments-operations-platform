const DEFAULT_API_BASE_URL = "http://localhost:5099";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export type Transaction = {
  id: string;
  merchantId: string;
  amount: number;
  status: string;
  chargeback: boolean;
  createdAt: string;
  merchant?: {
    id: string;
    name: string;
    status: string;
    riskLevel: string;
    createdAt: string;
  };
};

export type AnalyticsSummary = {
  totalMerchants: number;
  totalTransactions: number;
  transactionVolume: number;
  approvalRate: number;
  pendingMerchants: number;
  highRiskMerchants: number;
  chargebackRatio: number;
};

export type Merchant = {
  id: number;
  name: string;
  industry?: string | null;
  status?: string | null;
};

export type TransactionFilters = {
  status?: string;
  merchantId?: string;
  minAmount?: number;
  maxAmount?: number;
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${path} returned ${response.status}`);
  }

  return response.json();
}

export function getAnalyticsSummary() {
  return fetchJson<AnalyticsSummary>("/api/analytics/summary");
}

export async function getTransactions(filters?: TransactionFilters) {
  const params = new URLSearchParams();

  if (filters?.status) {
    params.append("status", filters.status);
  }

  if (filters?.merchantId) {
    params.append("merchantId", filters.merchantId);
  }

  if (filters?.minAmount !== undefined) {
    params.append("minAmount", filters.minAmount.toString());
  }

  if (filters?.maxAmount !== undefined) {
    params.append("maxAmount", filters.maxAmount.toString());
  }

  const queryString = params.toString();

  const url = queryString
    ? `/api/transactions?${queryString}`
    : "/api/transactions";

  return fetchJson<Transaction[]>(url);
}

export function getMerchants() {
  return fetchJson<Merchant[]>("/api/merchants");
}

export async function getRecentTransactions(filters?: TransactionFilters) {
  const transactions = await getTransactions(filters);

  return transactions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10);
}
