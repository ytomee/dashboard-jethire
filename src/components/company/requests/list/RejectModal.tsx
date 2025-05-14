import { Modal } from "@/components/ui/modal";
import { Trash, CircleX, Loader } from "@/icons";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: () => void;
  isLoading: boolean;
  successMessage?: string;
}

export const RejectModal = ({
  isOpen,
  onClose,
  onReject,
  isLoading,
  successMessage,
}: RejectModalProps
) => (
  <Modal isOpen={isOpen} onClose={onClose} showCloseButton={true} isFullscreen={false} className="max-w-[450px]">
    <div className="p-5 rounded-lg bg-white dark:bg-gray-900">
      {successMessage ? (
        <p className="text-neutral-700 dark:text-neutral-100 text-lg text-center">{successMessage}</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2 text-dark dark:text-white">Remover Empresa?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">Tem a certeza que deseja remover esta empresa?</p>
          <div className="flex w-full gap-4 mt-5">
            <button
              onClick={onReject}
              disabled={isLoading}
              className="w-1/2 flex justify-center items-center gap-2 rounded-xl bg-red-600 hover:bg-red-800 px-3 py-3 text-white text-lg transition disabled:opacity-50"
            >
              {isLoading ? <Loader className="size-6 animate-spin" /> : <Trash className="size-6" />} Remover
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
