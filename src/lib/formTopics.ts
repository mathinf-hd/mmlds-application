import type { FormTopics } from '$lib/formTypes';

export const formTopics: FormTopics = {
	'Practical computer science': {
		weight: 6,
		subtopics: [
			'Technical and formal basics of programming',
			'Syntax and semantics of programming languages',
			'Abstraction and specialization',
			'Specification and verification of algorithms',
			'Termination',
			'Complexity analysis'
		]
	},
	'Technical computer science': {
		weight: 6,
		subtopics: [
			'Boolean algebra',
			'Digital circuits',
			'Sequential logic',
			'Number representation and encoding',
			'Instruction pipelining',
			'Branch predictor'
		]
	},
	'Algorithms and data structures': {
		weight: 6,
		subtopics: [
			'Fundamentals of algorithms',
			'Run time analysis',
			'Basic data structures',
			'Sorting and hashing',
			'Graph algorithms',
			'Search'
		]
	},
	'Operating systems and networks': {
		weight: 6,
		subtopics: [
			'Processes and scheduling',
			'Memory management',
			'Concurrency and deadlocks',
			'APIs, file systems, and I/O',
			'Communication and routing',
			'TCP/IP and other protocols'
		]
	},
	'Software engineering': {
		weight: 6,
		subtopics: [
			'Requirements engineering',
			'Software design and modeling',
			'Quality management',
			'Evolution',
			'Software development process',
			'Project management'
		]
	},
	'Theoretical computer science': {
		weight: 6,
		subtopics: [
			'Computability',
			'Turing machines',
			'Halting problem',
			'Finite automaton',
			'Theory of formal languages',
			'Complexity theory'
		]
	},
	'Databases': {
		weight: 6,
		subtopics: [
			'Architecture and functionality of database systems',
			'Relational database model',
			'Query processing and optimization',
			'SQL',
			'Entity-relationship model',
			'Physical data organization'
		]
	},
	'Linear algebra': {
		weight: 6,
		subtopics: [
			'Basics of linear algebra',
			'Vector spaces',
			'Linear transformations',
			'Applications of linear transformations',
			'Inner product spaces',
			'Applications of inner product spaces'
		]
	},
	'Calculus': {
		weight: 6,
		subtopics: [
			'Complex numbers',
			'Sequences and series',
			'Continuity, limits, and Taylor expansion',
			'Derivatives and mean value theorem',
			'Fundamental theorem of calculus',
			'Integrals and basics of multidimensional analysis'
		]
	}
};
