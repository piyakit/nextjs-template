import { HttpStatus } from '@/lib/constrants/http-status';
import { NextResponse } from 'next/server';

let users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

// GET /api/users
export async function GET() {
  return NextResponse.json(users, { status: HttpStatus.OK });
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const newUser = { id: String(Date.now()), ...body };
    users.push(newUser);

    return NextResponse.json(newUser, { status: HttpStatus.CREATED });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
