import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/table';
import { columnMappings } from './columnMappings';

interface TableLayoutProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export const TableLayout = <TData, TValue>({ data, columns }: TableLayoutProps<TData, TValue>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="border-secondary w-full rounded-md border">
			<Table className="border-separate border-spacing-0">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className="bg-secondary font-bold"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													typeof header.column.columnDef.header === 'string'
														? (columnMappings[
																(header.column.columnDef.header
																	.charAt(0)
																	.toLowerCase() +
																	header.column.columnDef.header.slice(
																		1,
																	)) as keyof typeof columnMappings
															] as string)
														: header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className="bg-secondary"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="bg-secondary h-24 text-center"
							>
								Ничего не найдено
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
