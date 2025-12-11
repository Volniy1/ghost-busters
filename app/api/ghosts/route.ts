import { NextResponse } from 'next/server'
import { ghostSchema } from '@shared/lib/zod/schemas'

const ghosts = [
	{
		id: '1',
		name: 'Kitsune',
		location: 'Shinjuku District',
		threat: 'critical' as const,
		status: 'contained' as const,
	},
	{
		id: '2',
		name: 'Onryō',
		location: 'Abandoned Hospital',
		threat: 'critical' as const,
		status: 'contained' as const,
	},
	{
		id: '3',
		name: 'Yūrei',
		location: 'Old Temple Grounds',
		threat: 'low' as const,
		status: 'contained' as const,
	},
	{
		id: '4',
		name: 'Yōkai',
		location: 'Forest Reserve',
		threat: 'low' as const,
		status: 'contained' as const,
	},
	{
		id: '5',
		name: 'Tengu',
		location: 'Mountain Pass',
		threat: 'critical' as const,
		status: 'contained' as const,
	},
	{
		id: '6',
		name: 'Jibakurei',
		location: 'School Building',
		threat: 'low' as const,
		status: 'contained' as const,
	},
	{
		id: '7',
		name: 'Obake',
		location: 'Residential Area',
		threat: 'low' as const,
		status: 'active' as const,
	},
	{
		id: '8',
		name: 'Gashadokuro',
		location: 'Cemetery',
		threat: 'critical' as const,
		status: 'active' as const,
	},
]

export async function GET() {
	try {
		const validatedGhosts = ghosts.map((ghost) => ghostSchema.parse(ghost))

		return NextResponse.json(validatedGhosts, { status: 200 })
	} catch (error) {
		console.error('Error fetching ghosts:', error)
		return NextResponse.json({ error: 'Failed to fetch ghosts' }, { status: 500 })
	}
}

export { ghosts }
