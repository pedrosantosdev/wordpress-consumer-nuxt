import { describe, expect, it } from 'vitest'
import useIsSeriesLink from '../useIsSeriesLink'

describe('useIsSeriesLink', () => {
	it.each([
		'xt=urn:btih:51a139896af108445863794026dcfcf4f65dc678&dn=The.Bear.S02.COMPLETE.720p.HULU.WEBRip.x264-GalaxyTV&tr=udp',
		'xt=urn:btih:51a139896af108445863794026dcfcf4f65dc678&dn=The.Bear.T02.COMPLETE.720p.HULU.WEBRip.x264-GalaxyTV&tr=udp',
		'xt=urn:btih:51a139896af108445863794026dcfcf4f65dc678&dn=The.Bear.S02E01.720p.HULU.WEBRip.x264-GalaxyTV&tr=udp',
		'xt=urn:btih:51a139896af108445863794026dcfcf4f65dc678&dn=The.Bear.T02E01.720p.HULU.WEBRip.x264-GalaxyTV&tr=udp',
	])('Should Return true when is series', (text: string) => {
		expect(useIsSeriesLink(text)).toBeTruthy()
	})
})
