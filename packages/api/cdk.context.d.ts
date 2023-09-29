export type CDKContext = {
	account: string
	appName: string
	appDescription: string
	stage: envNameContext
	region: string
}

export type envNameContext = 'prod' | 'dev'