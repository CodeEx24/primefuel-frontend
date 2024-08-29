import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Typography from '../Typography';

type FormInputFileType = {
  logo: string;
  label: string;
  placeholder?: string;
  message?: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInputFile = ({
  logo,
  label,
  placeholder = 'Image',
  message,
  handleFileUpload,
}: FormInputFileType) => {
  return (
    <div className={`flex gap-4 justify-start items-start`}>
      <label htmlFor="fileInput" className="cursor-pointer">
        <Avatar className="rounded-md size-24 text-foreground border border-ring">
          <AvatarImage src={logo} className="object-contain" />
          <AvatarFallback className="rounded-md text-nowrap text-sm">
            Image
          </AvatarFallback>
        </Avatar>
      </label>

      <div className="space-y-2 flex-1">
        <Label className="text-foreground">{label}</Label>
        <Input
          id="fileInput"
          type="file"
          placeholder={placeholder}
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        {message && (
          <Typography className="text-error text-sm">{message}</Typography>
        )}
      </div>
    </div>
  );
};
