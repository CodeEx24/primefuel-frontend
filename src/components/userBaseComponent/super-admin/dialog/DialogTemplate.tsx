import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogTemplateType } from '@/shared/interface/DialogFormType';

export function DialogTemplate({
  children,
  label,
  title,
  description,
  isOpen,
  setShowDialog,
  isButton = true,
}: DialogTemplateType) {
  return (
    <Dialog onOpenChange={() => setShowDialog(!isOpen)} open={isOpen}>
      {isButton ? (
        <DialogTrigger asChild>
          <Button className="px-2 py-0.5 h-8 w-full">{label}</Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger className="w-full justify-start hover:bg-secondary text-sm text-start px-2 py-1.5 rounded-md">
          {label}
        </DialogTrigger>
      )}
      <DialogContent
        className={'lg:max-w-screen-lg overflow-y-scroll max-h-screen dark'}
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
