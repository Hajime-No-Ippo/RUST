mod two_sum;
use std::collections::HashMap;
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut map = HashMap::new();
        for(i ,&nums) in nums.iter().enumerate(){
            let complement = target - nums;

            if let Some(&index) = map.get(&complement){
                return vec![index as i32, i as i32];
            }
            map.insert(nums,i);
        }
        vec![]
    }
}