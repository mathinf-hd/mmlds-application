import type { FormTopics } from '$lib/formTypes';

export const formTopics: FormTopics = {
	'Practical computer science': {
		weight: 10,
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
		weight: 5,
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
		weight: 2,
		subtopics: [
			'Fundamentals of algorithms',
			'Run time analysis',
			'Basic data structures',
			'Sorting and hashing',
			'Manipulation of sets',
			'Search'
		]
	},
	'Operating systems and networks': {
		weight: 3,
		subtopics: [
			'Processes and scheduling',
			'Memory management',
			'Concurrency and deadlocks',
			'Input/output and files',
			'OSI model',
			'Communication and protocols'
		]
	},
	'Software engineering': {
		weight: 1,
		subtopics: [
			'Modeling with UML',
			'Software development process',
			'Requirements engineering',
			'Quality management',
			'Evolution',
			'Project management'
		]
	},
	'Theoretical computer science': {
		weight: 1,
		subtopics: [
			'Computability',
			'Turing machines',
			'Halting problem',
			'Finite automaton',
			'Theory of formal languages',
			'Complexity theory'
		]
	},
	'Data bases': {
		weight: 1,
		subtopics: [
			'Architecture and functionality of database systems',
			'Relational database model',
			'SQL',
			'Data integrity',
			'Physical data organization',
			'Multi-user synchronization'
		]
	},
	'Linear algebra': {
		weight: 1,
		subtopics: [
			'Basics of linear algebra',
			'Vector spaces',
			'Linear transformations',
			'Applications of linear transformations',
			'Inner product spaces',
			'Applications of inner product spaces'
		]
	},
	'Mathematical analysis': {
		weight: 1,
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
