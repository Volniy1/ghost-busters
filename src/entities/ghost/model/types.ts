export interface IGhost {
	name: string
	location: string
	threat: 'critical' | 'low'
	status: 'contained' | 'active'
	id?: string
}
