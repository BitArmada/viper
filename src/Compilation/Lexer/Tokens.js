
const TOKENS = {
	inc: '++',
	dec: '--',

	add: '+',
	sub: '-',
	pwr: '**',

	// concat,
	mul: '*',
	divide: '/',
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

	kw_export: 'export',

	kw_void: 'void',
	kw_int: 'int',
	kw_float: 'float',
	kw_string: 'string',
}

export default TOKENS;