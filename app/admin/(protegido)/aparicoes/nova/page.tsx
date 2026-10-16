import FormularioAparicao from "@/components/admin/FormularioAparicao";
import { cadastrarAparicao } from "../actions";

export default function NovaAparicao() {
  return (
    <FormularioAparicao action={cadastrarAparicao} />
  );
}