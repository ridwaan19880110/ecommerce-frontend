import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { supabase } from '../../../../../lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      company_name,
      registration_no,
      contact_person,
      contact_phone,
      website,
      address,
      product_categories,
      email,
      password,
    } = body;

    if (
      !company_name ||
      !contact_person ||
      !contact_phone ||
      !address ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if seller already exists
    const { data: existing, error: findError } = await supabase
      .from('sellers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Seller with this email already exists' },
        { status: 409 }
      );
    }

    if (findError && findError.code !== 'PGRST116') {
      console.error('Lookup error:', findError);
      return NextResponse.json({ error: 'Failed to check seller' }, { status: 500 });
    }

    const hashedPassword = await hash(password, 10);

    const { data: newSeller, error: insertError } = await supabase
      .from('sellers')
      .insert([
        {
          company_name,
          registration_no,
          contact_person,
          contact_phone,
          website,
          address,
          product_categories,
          email,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: insertError.message || 'Failed to register seller' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Seller registered successfully',
      seller: {
        id: newSeller.id,
        company_name: newSeller.company_name,
        email: newSeller.email,
      },
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
