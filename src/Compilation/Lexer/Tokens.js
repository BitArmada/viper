
const TOKENS = {
	wasm_start: 'WASM_START',
	wasm_end: 'WASM_END',

	inc: '++',
	dec: '--',

	add: '+',
	sub: '-',
	pwr: '**',

	// concat,
	mul: '*',
	div: '/',
	// idiv,
	mod: '%',

	bitwise_not: '!',
	bitwise_and: '&',
	bitwise_or: '|',
	bitwise_xor: '^',
	// shiftl,
	// shiftr,

	assign: '=',

	add_assign: '+=',
	sub_assign: '-=',
	// concat_assign,
	mul_assign: '*=',
	div_assign: '/=',
	// idiv_assign,
	mod_assign: '%=',

	qoutation: '"',
	lt: '<',
	gt: '>',
	le: '<=',
	ge: '>=',
	// and_assign,

	// or_assign,
	// xor_assign,
	// shiftl_assign,
	// shiftr_assign,

	// logical_not,
	// logical_and,
	// logical_or,

	// eq,
	// ne,
	// lt,
	// gt,
	// le,
	// ge,

	question: '?',
	colon: ':',
	comma: ',',

	semicolon: ';',

	open_round: '(',
	close_round: ')',

	open_curly: '{',
	close_curly: '}',

	open_square: '[',
	close_square: ']',

	kw_if: 'if',
	kw_else: 'else',
    
	kw_switch: 'switch',
	kw_case: 'case',
	kw_default: 'defualt',

	kw_for: 'for',
	kw_while: 'while',

	kw_break: 'break',
	kw_continue: 'continue',
	kw_return: 'return',

	kw_class: 'class',

	kw_import: 'import',

	kw_void: 'void',
	kw_int: 'int',
	kw_float: 'float',
	kw_string: 'string',
}

export default TOKENS;