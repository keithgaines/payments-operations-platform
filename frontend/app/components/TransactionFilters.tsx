"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Merchant } from "../../lib/api";

type TransactionFiltersProps = {
  merchants: Merchant[];
};

export function TransactionFilters({ merchants }: TransactionFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") ?? "";
  const merchantId = searchParams.get("merchantId") ?? "";
  const minAmount = searchParams.get("minAmount") ?? "";
  const maxAmount = searchParams.get("maxAmount") ?? "";

  function applyFilters(formData: FormData) {
    const params = new URLSearchParams();

    const nextStatus = formData.get("status")?.toString();
    const nextMerchantId = formData.get("merchantId")?.toString();
    const nextMinAmount = formData.get("minAmount")?.toString();
    const nextMaxAmount = formData.get("maxAmount")?.toString();

    if (nextStatus) params.set("status", nextStatus);
    if (nextMerchantId) params.set("merchantId", nextMerchantId);
    if (nextMinAmount) params.set("minAmount", nextMinAmount);
    if (nextMaxAmount) params.set("maxAmount", nextMaxAmount);

    const queryString = params.toString();

    router.push(queryString ? `/?${queryString}` : "/");
  }

  function clearFilters() {
    router.push("/");
  }

  return (
    <form
      action={applyFilters}
      className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-5"
    >
      <select
        name="status"
        defaultValue={status}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
      >
        <option value="">All statuses</option>
        <option value="Approved">Approved</option>
        <option value="Failed">Failed</option>
        <option value="Pending">Pending</option>
        <option value="Refunded">Refunded</option>
      </select>

      <select
        name="merchantId"
        defaultValue={merchantId}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
      >
        <option value="">All merchants</option>
        {merchants.map((merchant) => (
          <option key={merchant.id} value={merchant.id}>
            {merchant.name}
          </option>
        ))}
      </select>

      <input
        name="minAmount"
        type="number"
        min="0"
        step="0.01"
        placeholder="Min amount"
        defaultValue={minAmount}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
      />

      <input
        name="maxAmount"
        type="number"
        min="0"
        step="0.01"
        placeholder="Max amount"
        defaultValue={maxAmount}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
