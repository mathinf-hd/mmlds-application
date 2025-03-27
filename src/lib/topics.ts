export const formTopics: Topics = [
	{
		name: 'Differential Geometry',
		subtopics: [
			'Manifolds',
			'Vector bundles',
			'Lie groups',
			'Simplicial complexes',
			'Group actions',
			'Covering spaces'
		],
		module: [
			'Topological and differentiable manifolds',
			'Vector bundles',
			'Lie groups as an important example class',
			'Triangulations and simplicial complexes',
			'group actions also from a simplicial perspective',
			'covering spaces'
		]

	},
	{
		name: 'Functional Analysis',
		subtopics: [
			'Continuation of uniformly continuous maps',
			'Banach spaces and linear operators',
			'Duality and weak topology',
			'Measure theory and Lp spaces',
			'Hilbert spaces and self adjoint operators',
			'Spectral theory of compact operators'			
		],
		module: [
			'Metric spaces and their mappings: including completion, Baire theorem, (relatively) compact subsets and their characterisation, extendability of uniformly continuous mappings',
			'Normed spaces and their mappings: including Banach spaces, dual spaces, weak topologies, topological vector spaces, examples of function spaces, spectral theory of compact operators, with the usual theorems (including the spectral theorem)',
			'Hilbert spaces and their mappings'
		]
	},
	{	
		name: 'Numerical Analysis',
		subtopics: [
			'Conditioning and stability',
			'Interpolation and quadrature (1d)',
			'Matrix factorisation (LU, QR, SVD)',
			'Iterative methods and solution of nonlinear problems',
			'Numerical methods for (stiff) ODEs',
			'Eigenvalue problems'
		],
		module: [
			'fehlt noch'
		]
	},
	{
		name:'Statistics and Probability Theory',
		subtopics: [
			'Radon-Nikodym theorem',
			'Markov kernels',
			'Martingales',
			'Neyman-Pearson theory',
			'Maximum likelihood estimation',
			'Asymptotic normality'
		],
		module: [
			'Measure and integration theory: Algebras, Borel algebra, measurable mappings, construction of probability measures, product spaces. Expectation as a measure integral, Lebesgue, Beppo Levi, Fubini, and Radon-Nikodym theorems',
			'Conditional distributions: Conditional expectations, Markov kernels',
			'Stochastic processes and stopping times',
			'Martinggales in discrete time',
			'Markov chains in discrete time'
		]
	},
	{
		name: 'Variational Methods and Optimization',
		subtopics: [
			'Gateaux and Frechet derivative',
			'Convex duality in optimization',
			'Karush-Kuhn-Tucker conditions',
			'Positive (semi-)definite matrix cone',
			'Conic programs (LPs, SOCPs, SDPs)',
			'Proximal point methods'
		],
		module: [
			'Classification of optimization problems',
			'Gradient and Newton methods for unconstrained differentiable optimization',
			'Subdifferental calculus of convex functions',
			'Conjugation and convex duality',
			'Fermat s and Lagrangian optimality conditions',
			'Proximal point methods, operator splitting for convex optimizatoin problems'
		]
	}
]
