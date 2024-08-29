import Typography from '@/components/defaults/Typography';
import { DataTable } from '@/components/defaults/table/DataTable';
import { requestOrderColumns } from '@/components/userBaseComponent/admin/table/requestOrder/RequestOrderTableConfig';
import { RequestOrderTableToolbar } from '@/components/userBaseComponent/admin/table/requestOrder/RequestOrderTableToolbar';

export default function RequestOrderView() {
  return (
    <div className="space-y-4 w-full ">
      <div className="flex justify-between">
        <Typography variant="heading3" tag="h3">
          Request Order
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={requestOrderColumns}
          data={[]} // branchesResult?.data?.branches ||
          ToolbarComponent={RequestOrderTableToolbar}
        />
      </div>
    </div>
  );
}
