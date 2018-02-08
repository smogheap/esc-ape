LOAD({
	"name": "ape",
	"scale": 0.5,

	"above": [
		{
			"name": "arm-r",
			"image": "gpx/ape-arm-r.png",
			"pivot": {
				"x": 302,
				"y": 37
			},
			"rotate": 24,
			"scale": 1,
			"alpha": 1,
			"offset": {
				"x": 673-760,
				"y": 243-360
//				"x": 673.3333333333334,
//				"y": 243.33333333333331
////				"x": 760.0000000000005,
////				"y": 359.99999999999983
			},
			"above": [
				{
					"name": "forearm-r",
					"image": "gpx/ape-forearm-r.png",
					"pivot": {
						"x": 202,
						"y": 9
					},
					"rotate": 54,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 53.3333333333333,
						"y": 176.6666666666662
					},
					"above": [],
					"below": [
						{
							"name": "dummy-hand-r-back",
							"tag": "back",
							"pivot": { "x": 0, "y": 0 },
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": { "x": 0, "y": 0 },
							"below": [
								{
									"name": "hand-closed-r-back",
									"image": "gpx/ape-hand-closed-r-back.png",
									"tag": "rclose",
									"pivot": {
										"x": 72,
										"y": 177
									},
									"rotate": -181,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 59.99999999999993,
										"y": 423.3333333333335
									},
									"above": [],
									"below": []
								},
								{
									"name": "hand-open-r-back",
									"image": "gpx/ape-hand-open-r-back.png",
									"tag": "ropen",
									"pivot": {
										"x": 129,
										"y": 227
									},
									"rotate": -183,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 56.666666666666636,
										"y": 423.33333333333326
									},
									"above": [],
									"below": []
								}
							]
						},
						{
							"name": "dummy-hand-r-front",
							"tag": "front",
							"pivot": { "x": 0, "y": 0 },
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": { "x": 0, "y": 0 },
							"below": [
								{
									"name": "hand-closed-r-front",
									"image": "gpx/ape-hand-closed-r-front.png",
									"tag": "rclose",
									"pivot": {
										"x": 63,
										"y": 184
									},
									"rotate": -173,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 66.6666666666666,
										"y": 423.3333333333334
									},
									"above": [],
									"below": []
								},
								{
									"name": "hand-open-r-front",
									"image": "gpx/ape-hand-open-r-front.png",
									"tag": "ropen",
									"pivot": {
										"x": 88,
										"y": 211
									},
									"rotate": -188,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 63.33333333333326,
										"y": 436.666666666667
									},
									"above": [],
									"below": []
								}
							]
						}
					]
				}
			],
			"below": []
		}
	],
	"below": [
		{
			"name": "arm-l",
			"image": "gpx/ape-arm-l.png",
			"pivot": {
				"x": 33,
				"y": 282
			},
			"rotate": 58,
			"scale": 1,
			"alpha": 1,
			"offset": {
				"x": 816-760,
				"y": 236-360
//				"x": 816.6666666666663,
//				"y": 236.66666666666663
////				"x": 760.0000000000005,
////				"y": 359.99999999999983
			},
			"above": [
				{
					"name": "forearm-l",
					"image": "gpx/ape-forearm-l.png",
					"pivot": {
						"x": 49,
						"y": 438
					},
					"rotate": 8,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 193.33333333333317,
						"y": 53.33333333333325
					},
					"above": [],
					"below": [
						{
							"name": "dummy-hand-l-back",
							"tag": "back",
							"pivot": { "x": 0, "y": 0 },
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": { "x": 0, "y": 0 },
							"below": [
								{
									"name": "hand-closed-l-back",
									"image": "gpx/ape-hand-closed-l-back.png",
									"tag": "lclose",
									"pivot": {
										"x": 70,
										"y": 164
									},
									"rotate": 0,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 196.66666666666677,
										"y": 3.3333333333332775
									},
									"above": [],
									"below": []
								},
								{
									"name": "hand-open-l-back",
									"image": "gpx/ape-hand-open-l-back.png",
									"tag": "lopen",
									"pivot": {
										"x": 69,
										"y": 252
									},
									"rotate": -3,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 203.3333333333333,
										"y": 6.666666666666762
									},
									"above": [],
									"below": []
								}
							]
						},
						{
							"name": "dummy-hand-l-front",
							"tag": "front",
							"pivot": { "x": 0, "y": 0 },
							"rotate": 0,
							"scale": 1,
							"alpha": 1,
							"offset": { "x": 0, "y": 0 },
							"below": [
								{
									"name": "hand-closed-l-front",
									"image": "gpx/ape-hand-closed-l-front.png",
									"tag": "lclose",
									"pivot": {
										"x": 35,
										"y": 74
									},
									"rotate": -98,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 196.6666666666666,
										"y": 9.999999999999812
									},
									"above": [],
									"below": []
								},
								{
									"name": "hand-open-l-front",
									"image": "gpx/ape-hand-open-l-front.png",
									"tag": "lopen",
									"pivot": {
										"x": 59,
										"y": 67
									},
									"rotate": -103,
									"scale": 1,
									"alpha": 1,
									"offset": {
										"x": 203.33333333333337,
										"y": 1.1546319456101628e-14
									},
									"above": [],
									"below": []
								}
							]
						}
					]
				}
			],
			"below": []
		},
		{
			"name": "body-back",
			"image": "gpx/ape-body-back.png",
			"tag": "back",
			"pivot": {
				"x": 149,
				"y": 183
			},
			"rotate": 0,
			"scale": 1,
			"alpha": 1,
			"offset": {
				"x": 0,
				"y": 0
//				"x": 760.0000000000005,
//				"y": 359.99999999999983
			},
			"above": [],
			"below": [
				{
					"name": "head-back",
					"image": "gpx/ape-head-back.png",
					"pivot": {
						"x": 111,
						"y": 249
					},
					"rotate": 5,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 176.66666666666657,
						"y": -6.666666666666655
					},
					"above": [],
					"below": []
				},
				{
					"name": "leg-l-back",
					"image": "gpx/ape-leg-l-back.png",
					"pivot": {
						"x": 17,
						"y": 50
					},
					"rotate": 30,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 73.33333333333374,
						"y": 329.9999999999999
					},
					"above": [],
					"below": []
				},
				{
					"name": "leg-r-back",
					"image": "gpx/ape-leg-r-back.png",
					"pivot": {
						"x": 65,
						"y": 39
					},
					"rotate": 15,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 166.6666666666665,
						"y": 323.33333333333366
					},
					"above": [],
					"below": []
				}
			]
		},
		{
			"name": "body-front",
			"image": "gpx/ape-body-front.png",
			"tag": "front",
			"pivot": {
				"x": 153,
				"y": 192
			},
			"rotate": 0,
			"scale": 1,
			"alpha": 1,
			"offset": {
				"x": 0,
				"y": 0
//				"x": 760.0000000000007,
//				"y": 350.0000000000005
			},
			"above": [
				{
					"name": "head-front",
					"image": "gpx/ape-head-front.png",
					"pivot": {
						"x": 118,
						"y": 238
					},
					"rotate": 10,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 190.00000000000028,
						"y": 19.999999999999986
					},
					"above": [],
					"below": []
				},
				{
					"name": "leg-l-front",
					"image": "gpx/ape-leg-l-front.png",
					"pivot": {
						"x": 13,
						"y": 66
					},
					"rotate": 36,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 183.33333333333317,
						"y": 349.9999999999995
					},
					"above": [],
					"below": []
				},
				{
					"name": "leg-r-front",
					"image": "gpx/ape-leg-r-front.png",
					"pivot": {
						"x": 246,
						"y": 8
					},
					"rotate": -20,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 70.00000000000018,
						"y": 346.6666666666666
					},
					"above": [],
					"below": []
				}
			],
			"below": []
		}
	],
	"pose": {}
});
