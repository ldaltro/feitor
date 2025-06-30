import { OwnerForm } from "@/components/owner-form";

export default function AddOwnerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Proprietário</h1>
        <p className="text-muted-foreground">
          Cadastre um novo proprietário de animais
        </p>
      </div>
      <OwnerForm />
    </div>
  );
}