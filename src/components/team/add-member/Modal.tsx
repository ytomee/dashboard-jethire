import { Modal } from "@/components/ui/modal";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const AddMemberModal = ( { isOpen, onClose, message }: AddMemberModalProps ) => (
  <Modal isOpen={isOpen} onClose={onClose} showCloseButton={true} isFullscreen={false} className="max-w-[450px]">
    <div className="p-5 rounded-lg bg-white dark:bg-gray-900">
        <p className="text-neutral-700 dark:text-neutral-100 text-lg text-left">{message}</p>
    </div>
  </Modal>
);
