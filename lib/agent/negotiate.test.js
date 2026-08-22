const test = require("node:test");
const assert = require("node:assert/strict");
const { markdownAwareGetServerSideProps } = require("./negotiate");

function mockRes() {
	const headers = {};
	let body = "";
	return {
		headers,
		get body() {
			return body;
		},
		statusCode: 200,
		setHeader(key, value) {
			headers[key.toLowerCase()] = value;
		},
		end(chunk = "") {
			body = chunk;
		},
	};
}

test("getServerSideProps serves markdown with Vary: Accept", async () => {
	const res = mockRes();
	const gssp = markdownAwareGetServerSideProps("/");
	await gssp({ req: { headers: { accept: "text/markdown" } }, res });
	assert.equal(res.statusCode, 200);
	assert.match(res.headers["content-type"], /text\/markdown/);
	assert.match(res.headers.vary, /Accept/);
	assert.match(res.body, /^# SaaSCRM/);
});

test("getServerSideProps leaves HTML pages to React", async () => {
	const res = mockRes();
	const gssp = markdownAwareGetServerSideProps("/");
	const result = await gssp({
		req: { headers: { accept: "text/html,application/xhtml+xml" } },
		res,
	});
	assert.deepEqual(result, { props: {} });
	assert.equal(res.body, "");
	assert.match(res.headers.vary, /Accept/);
});

test("getServerSideProps returns 406 when produced types are rejected", async () => {
	const res = mockRes();
	const gssp = markdownAwareGetServerSideProps("/");
	await gssp({ req: { headers: { accept: "application/pdf" } }, res });
	assert.equal(res.statusCode, 406);
});
