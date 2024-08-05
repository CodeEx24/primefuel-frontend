import Typography from '@/components/defaults/Typography';
import { Input } from '@/components/ui/input';

export default function ShiftView() {
  return (
    <div className="space-y-4 w-full">
      <Typography variant="heading3" tag="h3">
        Shift
      </Typography>
      <div className="md:flex  justify-between w-full space-y-2 md:space-y-0 md:gap-4">
        <Input
          placeholder="Search"
          className="text-foreground w-full md:w-4/12"
        ></Input>
        <div className="md:flex space-y-2 md:space-y-0 md:gap-4 md:w-8/12">
          <Input placeholder="Branch" className="text-foreground"></Input>
          <Input placeholder="Product" className="text-foreground"></Input>
        </div>
      </div>
    </div>
  );
}
