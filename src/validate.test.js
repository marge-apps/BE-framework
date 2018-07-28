const validate = require('./validate')
const httpMocks = require('node-mocks-http');

describe('validate', () => {
	test('route', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/',

		})
		const [route] = validate();

		expect(route({req})).toEqual(true)
	}),

	test('handler', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/?token=1&challenge=abc',
		})
		const [_route, handler] = validate();

		expect(handler({req})).toEqual('abc')
	})

	test('handler with token', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/?token=1&challenge=abc',
		})
		const [_route, handler] = validate('1');

		expect(handler({req})).toEqual('abc')
	})

	test('handler with invalid token', () => {
		const req = httpMocks.createRequest({
			method: 'GET',
			url: '/?token=nope&challenge=abc',
		})
		const [_route, handler] = validate('1');

		expect(() => handler({req})).toThrowError('Invalid token')
	})
})
