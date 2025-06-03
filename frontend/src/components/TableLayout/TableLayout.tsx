import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/table';
import { columnMappings } from './columnMappings';
import { Link } from 'react-router-dom';

interface TableLayoutProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	baseUrl?: string;
}

export const TableLayout = <TData, TValue>({ data, columns, baseUrl }: TableLayoutProps<TData, TValue>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="overflow-auto rounded-md border shadow-sm">
			<Table className="min-w-full border-collapse text-sm">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="bg-muted"
						>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className="text-muted-foreground p-4 text-left font-semibold tracking-wide uppercase"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												typeof header.column.columnDef.header === 'string'
													? (columnMappings[
															(header.column.columnDef.header.charAt(0).toLowerCase() +
																header.column.columnDef.header.slice(
																	1,
																)) as keyof typeof columnMappings
														] as string)
													: header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, rowIndex) => {
							return (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className="hover:bg-muted cursor-pointer transition-colors"
								>
									{row.getVisibleCells().map((cell, i, arr) => (
										<TableCell
											key={cell.id}
											className={`p-4`}
										>
											<Link
												to={`/${baseUrl}/${row.original.id}`}
												className="block h-full w-full text-inherit"
												style={{ textDecoration: 'none' }}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Link>
										</TableCell>
									))}
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="text-muted-foreground h-24 text-center"
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
