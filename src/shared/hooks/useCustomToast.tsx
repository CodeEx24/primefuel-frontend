import { useToast } from '@/components/ui/use-toast';
import { ToastType } from '../constants/TOAST';

const getEmojiForType = (type: ToastType): string => {
  switch (type) {
    case 'Success':
      return '✅'; // Checkmark for success
    case 'Error':
      return '❌'; // Cross for error
    case 'Info':
      return 'ℹ️'; // Info symbol for info
    case 'Warning':
      return '⚠️'; // Warning sign for warnings
    default:
      return '';
  }
};

export const useCustomToast = () => {
  const { toast } = useToast();

  const showToast = (type: ToastType, description: string, title?: string) => {
    const emoji = getEmojiForType(type);
    toast({
      title: `${emoji} ${title ? title : type}`,
      description,
    });
  };

  return { showToast };
};
