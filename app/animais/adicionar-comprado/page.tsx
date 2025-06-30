import { AnimalPurchaseForm } from "@/components/animal-purchase-form";

export default function AddPurchasedAnimalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adicionar Animal Comprado</h1>
        <p className="text-muted-foreground">
          Registre um animal que foi adquirido de outra propriedade
        </p>
      </div>
      <AnimalPurchaseForm />
    </div>
  );
}