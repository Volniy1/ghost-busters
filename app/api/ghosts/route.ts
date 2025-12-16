import { NextResponse } from 'next/server'
import { ghostSchema } from '@shared/lib/zod/schemas'

const ghosts = [
	{
		id: '500',
		name: 'Kitsune',
		location: 'Shinjuku District',
		threat: 'critical' as const,
		status: 'contained' as const,
	},
	{
		id: '600',
		name: 'Onryō',
		location: 'Abandoned Hospital',
		threat: 'critical' as const,
		status: 'contained' as const,
	},
	{
		id: '453',
		name: 'Yūrei',
		location: 'Old Temple Grounds',
		threat: 'low' as const,
		status: 'contained' as const,
	},
	{
		id: '250',
		name: 'Yōkai',
		location: 'Forest Reserve',
		threat: 'low' as const,
		status: 'contained' as const,
	},
	{
		id: '800',
		name: 'Tengu',
		location: 'Mountain Pass',
		threat: 'critical' as const,
		status: 'contained' as const,
	},
	{
		id: '89',
		name: 'Jibakurei',
		location: 'School Building',
		threat: 'low' as const,
		status: 'contained' as const,
	},
	{
		id: '152',
		name: 'Obake',
		location: 'Residential Area',
		threat: 'low' as const,
		status: 'active' as const,
	},
	{
		id: '380',
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
