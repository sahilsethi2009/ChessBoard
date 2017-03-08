describe('Chess', function(){
  describe('#getBlockColour()', function(){
    it('should return "#000000" for alternate - even blocks', function(){
	    chai.assert.equal(getBlockColour(2,2),"#000000");
    });
	it('should return "#000000" for alternate - even blocks', function(){
	    chai.assert.equal(getBlockColour(4,2),"#000000");
    });
	
	it('should return "#ffffff" for alternate -  odd blocks', function(){
	    chai.assert.equal(getBlockColour(2,1),"#ffffff");
    });
	it('should return "#ffffff" for alternate -  odd blocks', function(){
	    chai.assert.equal(getBlockColour(1,2),"#ffffff");
    });
  });
  
  describe('#screenToBlock()', function(){
	  blockSize = 100;
    it('should return {row:2,col:2} for 200,200 position', function(){
		chai.assert.deepEqual(screenToBlock(200,200),{row: 2, col: 2});
    });
	it('should return {row:4,col:5} for 430,550 position', function(){
		chai.assert.deepEqual(screenToBlock(400,500),{row: 5, col: 4});
    });
  });
  
  
});