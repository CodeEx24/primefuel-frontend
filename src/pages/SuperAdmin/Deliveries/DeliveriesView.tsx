import { DataTable } from '@/components/defaults/table/DataTable';
import Typography from '@/components/defaults/Typography';
import { deliveryColumns } from '@/components/userBaseComponent/super-admin/table/delivery/DeliveryTableConfig';
import { DeliveryTableToolbar } from '@/components/userBaseComponent/super-admin/table/delivery/DeliveryTableToolbar';

export default function DeliveriesView() {
  return (
    <div className="space-y-4 w-full ">
      <div className="flex justify-between">
        <Typography variant="heading3" tag="h3">
          Delivery
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={deliveryColumns}
          data={[]} // branchesResult?.data?.branches ||
          ToolbarComponent={DeliveryTableToolbar}
        />
      </div>
    </div>
  );
}
