var hunterFSM = function (mesh, text){
  
  var timer;
  
  var fsm = StateMachine.create({

    events: [
		{ name: 'start',     from: 'none',      to: 'stand'  },
		{ name: 'found',     from: 'stand',     to: 'seek'   },
		{ name: 'found',     from: 'search',    to: 'seek'   },
		{ name: 'found',     from: 'patrol',    to: 'seek'   },
		{ name: 'hear',      from: 'stand',     to: 'search' },
		{ name: 'hear',      from: 'patrol',    to: 'search' },
		{ name: 'standed',   from: 'stand',     to: 'patrol' },
		{ name: 'patroled',  from: 'patrol',    to: 'stand'  },
		{ name: 'lost',      from: 'seek',      to: 'search' },
		{ name: 'nfound',    from: 'search',    to: 'stand'  },
		{ name: 'catched',   from: 'seek',      to: 'catch'  }
	],

    callbacks: {
		onbeforestart:      function(event, from, to) { },
		onstart:            function(event, from, to) { },

		onbeforefound:      function(event, from, to) { },
		onbeforehear:       function(event, from, to) { },
		onbeforestanded:    function(event, from, to) { },
		onbeforepatroled:   function(event, from, to) { },
		onbeforelost:       function(event, from, to) { },
		onbeforenfound:     function(event, from, to) { },
		onbeforecatched:    function(event, from, to) { },

		onfound:            function(event, from, to) { 
			//視線捕捉到玩家
		},
		onhear:             function(event, from, to) {
			//聽力範圍接觸到玩家
		},
		onstanded:          function(event, from, to) {
			//經過一段時間後，開始巡邏
		},
		onpatroled:         function(event, from, to) {
			//巡邏一段時間後，回到站立狀態
		},
		onlost:             function(event, from, to) {
			//完全追丟玩家
		},
		onnfound:           function(event, from, to) {
			//玩家消失在視線中
		},
		oncatched:          function(event, from, to) {
			//沒有聽到玩家的動靜
		},

		onleavestand:       function(event, from, to) { },
		onleavesearch:      function(event, from, to) { },
		onleaveseek:        function(event, from, to) { },
		onleavepatrol:      function(event, from, to) { },

		onstand:            function(event, from, to) {
		
			//站定點（放慢速）觀察
			//每兩秒轉換成patrol狀態
			text.text = "Hunter : Stand";
			mesh.material = new THREE.MeshLambertMaterial({color: 0xffffff});
		
			clearTimeout(timer);
			timer = setTimeout (function() {
				fsm.standed();
			},2000);
		},
		onsearch:           function(event, from, to) {
		
			//原地旋轉尋找玩家
			text.text = "Hunter : Search";
			mesh.material = new THREE.MeshLambertMaterial({color: 0xffff00}); 
		
			clearTimeout(timer);
		},
		onseek:             function(event, from, to) {
		
			//追逐玩家
			text.text = "Hunter : Seek" ;
			mesh.material = new THREE.MeshLambertMaterial({color: 0xff0000});
		
			clearTimeout(timer);
		},
		onpatrol:           function(event, from, to) {
		
			//隨機給予一個target使獵人往那方向行走
			//每五秒回到stand狀態
			text.text = "Hunter : Patrol" ;
			mesh.material = new THREE.MeshLambertMaterial({color: 0x000000});
		
			clearTimeout(timer);
			timer = setTimeout (function() {
				fsm.patroled();
			},5000);
		},
		oncatch:            function(event, from, to) { 
		
			//遊戲結束
			text.text = "Hunter : Catch";
		
			clearTimeout(timer);
		}
    }
  });

  fsm.start();
  return fsm;
}
