import { Share } from "@/components/share";

export function PreviewSidebar() {
  return (
    <div className="space-y-8">
      <Share />
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-serif text-gray-900">Sobre esta História</h2>
        <p className="text-gray-600">
          Esta é uma história de amor especial, compartilhada com carinho.
          Você pode criar a sua própria história clicando no botão abaixo.
        </p>
        <a
          href="/"
          className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
        >
          Criar Minha História
        </a>
      </div>
    </div>
  );
}