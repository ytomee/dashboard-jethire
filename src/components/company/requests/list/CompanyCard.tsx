import { Award, MapPin, MonitorSmartphone, UserRoundSearch, CircleCheck, CircleX } from "@/icons";

interface CompanyRequest {
  companyName: string;
  nif: string;
  foundedYear: string;
  status: string;
  country: string;
  city: string;
  address: string;
  generalEmail: string;
  phone: string;
  website: string;
  responsiblePerson: string;
  responsibleEmail: string;
  responsiblePhone: string;
}

interface CompanyCardProps {
  company: CompanyRequest;
  statusMap: Record<string, string>;
  onValidate: () => void;
  onReject: () => void;
}

export const CompanyCard = ( { company, statusMap, onValidate, onReject }: CompanyCardProps ) => {

  const isPending = company.status?.toLowerCase() === "pending";

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">{company.companyName}</h2>

      <div className="mb-6">
        <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><Award className="size-6" />Dados da Empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
          <div><span className="font-medium dark:text-white">NIF:</span> {company.nif}</div>
          <div><span className="font-medium dark:text-white">Ano de fundação:</span> {company.foundedYear}</div>
          <div><span className="font-medium dark:text-white">Estado:</span> {statusMap[company.status]}</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><MapPin className="size-6" />Localização</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
          <div><span className="font-medium dark:text-white">País:</span> {company.country}</div>
          <div><span className="font-medium dark:text-white">Cidade:</span> {company.city}</div>
          <div><span className="font-medium dark:text-white">Morada:</span> {company.address}</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><MonitorSmartphone className="size-6" />Contactos</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
          <div><span className="font-medium dark:text-white">Email geral:</span> {company.generalEmail}</div>
          <div><span className="font-medium dark:text-white">Telefone:</span> {company.phone}</div>
          <div><span className="font-medium dark:text-white">Website:</span> {company.website}</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 flex gap-2 text-lg font-semibold text-gray-700 dark:text-white"><UserRoundSearch className="size-6" />Responsável</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-6 text-base text-gray-700 dark:text-gray-300">
          <div><span className="font-medium dark:text-white">Nome:</span> {company.responsiblePerson}</div>
          <div><span className="font-medium dark:text-white">Email:</span> {company.responsibleEmail}</div>
          <div><span className="font-medium dark:text-white">Telefone:</span> {company.responsiblePhone}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={onValidate}
          disabled={!isPending}
          className={`flex items-center gap-1 rounded-lg px-4 py-3 text-white transition
            ${isPending ? "bg-neutral-600 hover:bg-neutral-700" : "bg-neutral-400 cursor-not-allowed"}
          `}
        >
          <CircleCheck className="size-6" />Validar
        </button>
        <button
          onClick={onReject}
          disabled={!isPending}
          className={`flex items-center gap-1 rounded-lg px-4 py-3 text-white transition
            ${isPending ? "bg-red-600 hover:bg-red-700" : "bg-red-400 cursor-not-allowed"}
          `}
        >
          <CircleX className="size-6" />Remover
        </button>
      </div>
    </div>
)};
