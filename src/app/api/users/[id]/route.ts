import { HttpStatus } from '@/app/lib/constrants/http-status';
import { NextResponse } from 'next/server';

let users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: HttpStatus.NOT_FOUND }
    );
  }
  return NextResponse.json(user, { status: HttpStatus.OK });
}
