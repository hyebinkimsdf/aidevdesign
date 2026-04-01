import AdminDashboard from "./AdminDashboard";
import { getPortfolioItems } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const items = await getPortfolioItems();
  return <AdminDashboard initialItems={items} />;
}
