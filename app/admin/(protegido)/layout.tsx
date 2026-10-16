import { exigirAdministrador } from "@/lib/supabase/admin";

export default async function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  await exigirAdministrador();

  return <>{children}</>;
}