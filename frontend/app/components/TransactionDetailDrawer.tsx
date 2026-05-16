"use client";

import { useState } from "react";
import type { Transaction } from "../../lib/api";
import { createPortal } from "react-dom";

type Props = {
  transactions: Transaction[];
};

export function TransactionDetailDrawer({ transactions }: Props) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  return (
    <>
      <TransactionTable
        transactions={transactions}
        onSelectTransaction={setSelectedTransaction}
      />

      <TransactionDrawer
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
}

function TransactionTable({
  transactions,
  onSelectTransaction,
}: {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b text-slate-500">
            <th scope="col" className="py-3 pr-4 font-medium">
              Merchant
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Amount
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Status
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Method
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Created
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              onClick={() => onSelectTransaction(transaction)}
              className="cursor-pointer transition hover:bg-slate-50"
            >
              <td className="py-3 pr-4 font-medium text-slate-900">
                <p>{transaction.merchant?.name ?? "Unknown Merchant"}</p>
                <p className="mt-0.5 text-xs font-normal text-slate-500">
                  {transaction.merchant?.riskLevel ?? "Unknown"} risk
                </p>
              </td>

              <td className="py-3 pr-4 text-slate-700">
                {formatCurrency(transaction.amount)}
              </td>

              <td className="py-3 pr-4">
                <StatusBadge status={transaction.status} />
              </td>

              <td className="py-3 pr-4 text-slate-700">Card</td>

              <td className="py-3 pr-4 text-slate-500">
                {formatDate(transaction.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TransactionDrawer({
  transaction,
  onClose,
}: {
  transaction: Transaction | null;
  onClose: () => void;
}) {
  if (!transaction) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <button
        type="button"
        aria-label="Close transaction drawer"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/40 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-title"
        className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white shadow-2xl"
      >
        <div className="sticky top-0 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Transaction Investigation
              </p>

              <h2
                id="transaction-title"
                className="mt-1 text-2xl font-semibold text-slate-900"
              >
                {transaction.merchant?.name ?? "Unknown Merchant"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          <section className="grid gap-3 sm:grid-cols-2">
            <DetailCard
              label="Amount"
              value={formatCurrency(transaction.amount)}
            />
            <DetailCard label="Payment Method" value="Card" />
            <DetailCard
              label="Created"
              value={formatDate(transaction.createdAt)}
            />
            <DetailCard
              label="Chargeback"
              value={transaction.chargeback ? "Yes" : "No"}
            />
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Merchant Context
            </h3>

            <div className="mt-4 space-y-3">
              <DetailRow
                label="Merchant Status"
                value={transaction.merchant?.status ?? "Unknown"}
              />
              <DetailRow
                label="Risk Level"
                value={transaction.merchant?.riskLevel ?? "Unknown"}
              />
              <DetailRow label="Merchant ID" value={transaction.merchantId} />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Operational Review Guidance
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Review payment status and amount for exception patterns.</li>
              <li>Check merchant risk level before escalation.</li>
              <li>Prioritize failed or chargeback-related transactions.</li>
              <li>
                Use merchant context to determine support or risk routing.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              System Identifiers
            </h3>

            <div className="mt-4 space-y-3">
              <DetailRow label="Transaction ID" value={transaction.id} />
            </div>
          </section>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClass(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

function RiskBadge({ riskLevel }: { riskLevel?: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getRiskClass(
        riskLevel,
      )}`}
    >
      {riskLevel ?? "Unknown"} Risk
    </span>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm text-slate-900">{value}</p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
    case "successful":
    case "success":
    case "completed":
      return "bg-green-100 text-green-700 ring-green-600/20";
    case "failed":
    case "declined":
      return "bg-red-100 text-red-700 ring-red-600/20";
    case "pending":
      return "bg-yellow-100 text-yellow-700 ring-yellow-600/20";
    case "refunded":
      return "bg-blue-100 text-blue-700 ring-blue-600/20";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-600/20";
  }
}

function getRiskClass(riskLevel?: string) {
  switch (riskLevel?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700 ring-red-600/20";
    case "medium":
      return "bg-yellow-100 text-yellow-700 ring-yellow-600/20";
    case "low":
      return "bg-green-100 text-green-700 ring-green-600/20";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-600/20";
  }
}
