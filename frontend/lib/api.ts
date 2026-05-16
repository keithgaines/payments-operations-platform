const DEFAULT_API_BASE_URL = "http://localhost:5099";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export type Transaction = {
  id: number;
  merchantId: number;
  merchantName?: string | null;
  amount: number;
  status: string;
  paymentMethod?: string | null;
  createdAt: string;
};

export type AnalyticsSummary = {
  totalVolume: number;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  successRate: number;
};

export type Merchant = {
  id: number;
  name: string;
  industry?: string | null;
  status?: string | null;
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

export function getTransactions() {
  return fetchJson<Transaction[]>("/api/transactions");
}

export function getMerchants() {
  return fetchJson<Merchant[]>("/api/merchants");
}

export async function getRecentTransactions() {
  const transactions = await getTransactions();

  return transactions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10);
}
