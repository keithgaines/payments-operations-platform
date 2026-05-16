import {
  getAnalyticsSummary,
  getMerchants,
  getRecentTransactions,
  type AnalyticsSummary,
} from "../lib/api";

import { TransactionFilters } from "./components/TransactionFilters";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function getStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case "successful":
    case "success":
    case "completed":
      return "bg-green-100 text-green-700";
    case "failed":
    case "declined":
      return "bg-red-100 text-red-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function buildOperationalAlerts(summary: AnalyticsSummary) {
  const alerts: string[] = [];

  if (summary.approvalRate < 80) {
    alerts.push(
      `Approval rate is ${summary.approvalRate.toFixed(
        1,
      )}%, below the 80% operational target.`,
    );
  }

  if (summary.pendingMerchants > 0) {
    alerts.push(
      `${summary.pendingMerchants} merchants are pending operational review.`,
    );
  }

  if (summary.highRiskMerchants > 0) {
    alerts.push(
      `${summary.highRiskMerchants} high-risk merchants require monitoring.`,
    );
  }

  if (summary.chargebackRatio > 2) {
    alerts.push(
      `Chargeback ratio is ${summary.chargebackRatio.toFixed(
        1,
      )}%, above the 2% review threshold.`,
    );
  }

  if (alerts.length === 0) {
    alerts.push("No active operational alerts.");
  }

  return alerts;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    merchantId?: string;
    minAmount?: string;
    maxAmount?: string;
  }>;
}) {
  const filters = await searchParams;

  const transactionFilters = {
    status: filters.status,
    merchantId: filters.merchantId,
    minAmount: filters.minAmount ? Number(filters.minAmount) : undefined,
    maxAmount: filters.maxAmount ? Number(filters.maxAmount) : undefined,
  };

  const [summary, transactions, merchants] = await Promise.all([
    getAnalyticsSummary(),
    getRecentTransactions(transactionFilters),
    getMerchants(),
  ]);

  const alerts = buildOperationalAlerts(summary);
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section>
          <p className="text-sm font-medium text-slate-500">
            Payments Operations Intelligence
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Operations Dashboard
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Live operational view of payment volume, transaction health,
            merchant activity, and exception monitoring.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total Volume"
            value={formatCurrency(summary.transactionVolume)}
            subtitle="Processed payment volume"
          />
          <KpiCard
            title="Transactions"
            value={(summary.totalTransactions ?? 0).toLocaleString()}
            subtitle="Total seeded transactions"
          />
          <KpiCard
            title="Success Rate"
            value={`${summary.approvalRate.toFixed(1)}%`}
            subtitle="Approved vs total transactions"
          />
          <KpiCard
            title="Merchants"
            value={merchants.length.toLocaleString()}
            subtitle="Active merchant records"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Transactions
                </h2>
                <p className="text-sm text-slate-500">
                  Live data from the backend transaction API.
                </p>
              </div>
            </div>
            <TransactionFilters merchants={merchants} />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="py-3 font-medium">Merchant</th>
                    <th className="py-3 font-medium">Amount</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Method</th>
                    <th className="py-3 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b last:border-b-0"
                    >
                      <td className="py-3 font-medium text-slate-900">
                        {transaction.merchant?.name ??
                          `Merchant #${transaction.merchantId}`}
                      </td>
                      <td className="py-3 text-slate-700">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                            transaction.status,
                          )}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-700">Card</td>
                      <td className="py-3 text-slate-500">
                        {formatDate(transaction.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Operational Alerts
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Derived from live KPI and transaction data.
            </p>

            <div className="mt-4 space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
                >
                  {alert}
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function KpiCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
