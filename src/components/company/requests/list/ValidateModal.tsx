import { Modal } from "@/components/ui/modal";
import { CircleCheck, CircleX, Loader } from "@/icons";

interface ValidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => void;
  isLoading: boolean;
  successMessage?: string;
}

export const ValidateModal = ({
  isOpen,
  onClose,
  onValidate,
  isLoading,
  successMessage,
}: ValidateModalProps ) => (
  <Modal isOpen={isOpen} onClose={onClose} showCloseButton={true} isFullscreen={false} className="max-w-[450px]">
    <div className="p-5 rounded-lg bg-white dark:bg-gray-900">
      {successMessage ? (
        <p className="text-neutral-700 dark:text-neutral-100 text-lg text-center">{successMessage}</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2 text-dark dark:text-white">Validar Empresa?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">Tem a certeza que deseja validar esta empresa?</p>
          <div className="flex w-full gap-4 mt-5">
            <button
              onClick={onValidate}
              disabled={isLoading}
              className="w-1/2 flex justify-center items-center gap-2 rounded-xl bg-green-600 hover:bg-green-800 px-3 py-3 text-white text-lg transition disabled:opacity-50"
            >
              {isLoading ? <Loader className="size-6 animate-spin" /> : <CircleCheck className="size-6" />} Validar
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-1/2 flex justify-center items-center gap-2 rounded-xl bg-neutral-600 hover:bg-neutral-800 px-3 py-3 text-white text-lg transition disabled:opacity-50"
            >
              <CircleX className="size-6" />Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  </Modal>
);
