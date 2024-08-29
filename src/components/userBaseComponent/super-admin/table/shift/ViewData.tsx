import Typography from '@/components/defaults/Typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ShiftDataProps } from '@/shared/interface/DialogFormType';
import { formatTime } from '@/shared/utils/timeConvert';

export default function ShiftViewData({ branchShift }: ShiftDataProps) {
  return (
    <div className="text-white w-full space-y-2">
      <Typography variant="paragraph" className="font-semibold">
        Branch Name: <span className="font-normal">{branchShift?.branch}</span>
      </Typography>
      <Typography variant="paragraph" className="font-semibold">
        Region: <span className="font-normal">{branchShift?.branch}</span>
      </Typography>
      <Typography variant="paragraph" className="font-semibold">
        Province: <span className="font-normal">{branchShift?.province}</span>
      </Typography>
      <Typography variant="paragraph" className="font-semibold">
        Municipality:{' '}
        <span className="font-normal">{branchShift?.municipality}</span>
      </Typography>

      <Table className="border mt-4">
        <TableHeader className="bg-background-muted">
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branchShift?.shifts.map((shift) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">{shift.day}</TableCell>
                  <TableCell>
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
