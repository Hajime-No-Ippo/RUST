 pub fn calculator(nums: i32, target: i32, operator:char ) -> i32 {
    match operator {
        '+' => nums + target,
        '-' => nums - target,
        '*' => nums * target,
        '/' => {
            if target != 0 {
                nums / target
            } else {
                panic!("Division by zero is not allowed");
            }
        }
        _ => panic!("Unsupported operator"),
    }
 }
     