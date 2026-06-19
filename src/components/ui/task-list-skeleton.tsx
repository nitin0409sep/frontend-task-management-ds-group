import { Card, CardContent, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

export const TaskListSkeleton = () => (
  <>
    <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' } }}>
      <Table>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton height={28} /></TableCell>
              <TableCell><Skeleton width={90} height={28} /></TableCell>
              <TableCell><Skeleton width={80} height={28} /></TableCell>
              <TableCell><Skeleton width={120} height={28} /></TableCell>
              <TableCell><Skeleton width={100} height={28} /></TableCell>
              <TableCell align="right"><Skeleton width={80} height={28} sx={{ ml: 'auto' }} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Stack spacing={1.5} sx={{ display: { md: 'none' } }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} variant="outlined">
          <CardContent>
            <Stack spacing={1.5}>
              <Skeleton height={28} width="70%" />
              <Skeleton height={20} />
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" width={90} height={28} />
                <Skeleton variant="rounded" width={80} height={28} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  </>
);
