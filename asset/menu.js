LOAD({
	"name": "menu",
	"scale": 1,
	"above": [
		{
			"name": "menu",
			"image": "gpx/menu.jpg",
			"pivot": {
				"x": 0,
				"y": 0
			},
			"rotate": 0,
			"scale": 1,
			"alpha": 1,
			"offset": {
				"x": 0,
				"y": 0
			},
			"above": [
				{
					"name": "key",
					"image": "gpx/esckey.png",
					"pivot": {
						"x": 230,
						"y": 410
					},
					"rotate": 0,
					"scale": 0.4,
					"alpha": 1,
					"offset": {
						"x": 1920 / 2,
						"y": 1080 / 3
					}
				},

				{
					"name": "hand-closed-l-front",
					"image": "gpx/ape-hand-closed-l-front.png",
					"tag": "left",
					"pivot": {
						"x": 35,
						"y": 74
					},
					"rotate": -98,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 1920 * 6/16,
						"y": 1080 / 3
					},
					"above": [],
					"below": []
				},
				{
					"name": "hand-open-l-front",
					"image": "gpx/ape-hand-open-l-front.png",
					"tag": "right",
					"pivot": {
						"x": 59,
						"y": 67
					},
					"rotate": -103,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 1920 * 6/16,
						"y": 1080 / 3
					},
					"above": [],
					"below": []
				},
				{
					"name": "hand-closed-r-front",
					"image": "gpx/ape-hand-closed-r-front.png",
					"tag": "right",
					"pivot": {
						"x": 63,
						"y": 184
					},
					"rotate": -30,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 1920 * 10/16 + 20,
						"y": 1080 / 3
					},
					"above": [],
					"below": []
				},
				{
					"name": "hand-open-r-front",
					"image": "gpx/ape-hand-open-r-front.png",
					"tag": "left",
					"pivot": {
						"x": 88,
						"y": 211
					},
					"rotate": -30,
					"scale": 1,
					"alpha": 1,
					"offset": {
						"x": 1920 * 10/16 + 20,
						"y": 1080 / 3
					},
					"above": [],
					"below": []
				}
			]
		}
	],
	"below": [
	],
	"pose": {}
});
